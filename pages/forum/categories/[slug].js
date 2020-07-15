import BaseLayout from "@/layouts/BaseLayout";
import { useGetTopicsByCategory, useGetUser, useCreateTopic } from "@/apollo/actions";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { useRouter } from "next/router";
import Replier from "../../../components/shared/Replier";
import { useState } from "react";

function Topics() {
  const [isReplierOpen, setReplierOpen] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  //fetching the data
  const { data: topicData } = useGetTopicsByCategory({
    variables: { category: slug },
  });
  //fetching the user because we cant only to toggle if there is user logged in
  const { data: userData } = useGetUser();

  //
  const [createTopic] = useCreateTopic();

  const topicsByCategory = topicData ? topicData.topicsByCategory : [];
  const user = userData ? userData.user : null;

  const toggleReplier = () => setReplierOpen(!isReplierOpen);
  const closeReplier = () => setReplierOpen(false);

  const handleCreateTopic = (topicData, done) => {
    topicData.forumCategory = slug;
    createTopic({variables: topicData}).then(() => {
      done();
      setReplierOpen(false)
    })
  };

  const goToTopic = (slug) => {
    router.push("/forum/topics/[slug]", `/forum/topics/${slug}`)
  }

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Select a Topic</h1>
            <button
              disabled={!user ? true : false}
              onClick={toggleReplier}
              className="btn btn-primary"
            >
              Create a Topic
            </button>
            {!user && <i className="ml-2">Login to create a topic</i>}
          </div>
        </div>
      </section>
      <section className="fj-topic-list">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
            </tr>
          </thead>
          <tbody>
            {topicsByCategory.map((topic) => (
              <tr key={topic._id} onClick={() => goToTopic(topic.slug)}>
                <th>{topic.title}</th>
                <td className="category">{topic.forumCategory.title}</td>
                <td>{topic.user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Replier
        onSubmit={handleCreateTopic}
        isOpen={isReplierOpen}
        onClose={closeReplier}
      />
    </BaseLayout>
  );
}

export default withApollo(Topics, { getDataFromTree });
