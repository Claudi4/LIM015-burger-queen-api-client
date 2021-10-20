import * as React from 'react';
import {
  useParams, Redirect,
} from "react-router-dom";

function Topic({ routes }) {
  let { topicId } = useParams();
  const matchRoutes = routes?.filter((item) => item.text.toLowerCase() === topicId);
  const redirect = matchRoutes.length === 0 ? true : false;
  return (
    <div>
      { redirect && <Redirect to="/404"/> }
      { matchRoutes[0].main }
    </div>
  );
}

export default Topic;
