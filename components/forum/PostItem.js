import { fromNow } from "@/helpers/functions";

function PostItem(props) {
  const { data, className, onReply, canCreate } = props;
  return (
    <div className={`topic-post ${className}`}>
      <article>
        <div className="row">
          <div className="topic-avatar">
            <div className="main-avatar">
              <img
                className="avatar subtle-shadow"
                src={data.user.avatar}
              ></img>
            </div>
          </div>
          <div className="topic-body">
            <div className="topic-header">
              <div className="topic-meta">
                <div className="name-container">
                  <span className="name">{data.user.username}</span>
                </div>
                {data.createdAt && (
                  <div className="date-container">
                    <span className="date">{fromNow(data.createdAt)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="topic-content">
              {data.parent && (
                <div className="topic-parent cooked">
                  <div className="topic-parent-inner cooked">
                    <div className="topic-parent-header">
                      <div className="topic-parent-avatar">
                        <div className="main-avatar">
                          <img
                            className="avatar subtle-shadow"
                            src={data.parent.user.avatar}
                          ></img>
                        </div>
                      </div>
                      <div className="username">
                        {data.parent.user.username}
                      </div>
                    </div>
                    <div className="topic-parent-content">
                      <p>{data.parent.content}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="cooked">
                <p>{data.content}</p>
              </div>
              <section className="post-menu-area">
                <nav className="post-controls">
                  <div className="actions">
                    {onReply && (
                      <button
                        disabled={!canCreate}
                        onClick={() => onReply({ ...data })}
                        className="btn"
                      >
                        reply
                      </button>
                    )}
                  </div>
                </nav>
              </section>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default PostItem;
