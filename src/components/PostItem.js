import moment from "moment";
import PropTypes from "prop-types";

export default function PostItem({ data, children, redirect }) {
  return (
    <div
      className="posts__item"
      onClick={redirect ? () => redirect(data.id) : null}
    >
      <div className="user__info">
        <div className="user__info-photo">
          <img src={`https://i.pravatar.cc/300?${Math.random()}`} alt="" />
        </div>
        <div className="user__name">
          <h3>Иван Иванов</h3>
          <div className="user__status">
            <p>Основатель группы</p>
            <span>{`${moment().diff(data.created, "minutes")} мин.`}</span>
          </div>
        </div>
      </div>
      <div className="post__content">
        <p>{data.content}</p>
      </div>
      {children}
    </div>
  );
}
PostItem.defaultProps = {
  redirect: null,
};

PostItem.propTypes = {
  data: PropTypes.object,
};
