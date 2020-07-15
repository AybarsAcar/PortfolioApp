import { useState, useRef } from "react";
import BaseLayout from "@/layouts/BaseLayout";
import {
  useGetTopicBySlug,
  useGetPostsByTopic,
  useGetUser,
  useCreatePost,
} from "@/apollo/actions";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { useRouter } from "next/router";
import PostItem from "../../../components/forum/PostItem";
import Replier from "../../../components/shared/Replier";
import { toast } from "react-toastify";
import AppPagination from "../../../components/shared/Pagination";

const useInitialData = (slug, pagination) => {
  const { data: topicData } = useGetTopicBySlug({
    variables: { slug },
  });

  const { data: postsData, fetchMore } = useGetPostsByTopic({
    variables: { slug, ...pagination }, pollInterval: 5000,
  });

  const { data: userData } = useGetUser();

  const topic = topicData ? topicData.topicBySlug : {};
  const postsObj = postsData ? postsData.postsByTopic : { posts: [], count: 0 };
  const user = userData ? userData.user : null;

  return { topic, ...postsObj, user, fetchMore };
};

function PostPage() {
  const router = useRouter();
  const { slug, pageNum = 1, pageSize = 5 } = router.query;

  const [pagination, setPagination] = useState({
    pageNum: parseInt(pageNum, 10),
    pageSize: parseInt(pageSize, 10),
  });

  const { topic, posts, count, user, fetchMore } = useInitialData(
    slug,
    pagination
  );

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <Posts
        onPageChange={(pageNum, pageSize) => {
          router.push(
            "/forum/topics/[slug]",
            `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`,
            { shallow: true }
          );
          
          setPagination({ pageNum, pageSize });
        }}
        count={count}
        posts={posts}
        topic={topic}
        user={user}
        fetchMore={fetchMore}
        {...pagination}
      />
    </BaseLayout>
  );
}

const Posts = (props) => {
  const {
    posts,
    topic,
    user,
    fetchMore,
    count,
    pageNum,
    pageSize,
    onPageChange,
  } = props;

  const pageEnd = useRef();
  const [createPost, { error }] = useCreatePost();
  const [isReplierOpen, setIsReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }
    reply.topic = topic._id;
    await createPost({ variables: reply });
    let lastPage = Math.ceil(count / pageSize);
    if (count === 0) lastPage = 1;

    lastPage === pageNum && await fetchMore({
      variables: {pageSize, pageNum: lastPage},
      updateQuery: (prevResults, options) => {
        const { fetchMoreResult } = options;
        return Object.assign({}, prevResults, {
          postsByTopic: {...fetchMoreResult.postsByTopic},
        });
      },
    });
    resetReplier();
    cleanUp();
  };

  const cleanUp = () => {
    setIsReplierOpen(false);
    toast.success("Successfully Posted!", { autoClose: 2000 });
    scrollToBottom();
  };

  const scrollToBottom = () => {
    pageEnd.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <section className="mb-5">
      <div className="fj-post-list">
        {topic._id && pageNum === 1 && (
          <PostItem className="topic-post-lead" data={topic} />
        )}
        {posts.map((p) => (
          <div key={p._id} className="row">
            <div className="col-md-9">
              <PostItem
                data={p}
                canCreate={user ? true : false}
                onReply={(reply) => {
                  setReplyTo(reply);
                  setIsReplierOpen(!isReplierOpen);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user && (
              <div className="pt-2 pb-2">
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setIsReplierOpen(!isReplierOpen);
                  }}
                  className="btn btn-lg btn-outline-primary"
                >
                  Create a New Post
                </button>
              </div>
            )}
            <div className="pagination-container ml-auto">
              <AppPagination
                count={count}
                pageSize={pageSize}
                onChange={onPageChange}
                pageNum={pageNum}
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={pageEnd}></div>
      <Replier
        hasTitle={false}
        replyTo={replyTo ? replyTo.user.username : topic.title}
        onSubmit={handleCreatePost}
        isOpen={isReplierOpen}
        onClose={() => {}}
      />
    </section>
  );
};

export default withApollo(PostPage, { getDataFromTree });
