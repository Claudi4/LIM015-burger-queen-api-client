import * as React from 'react';
import {
  useParams, Redirect,
} from "react-router-dom";

function Topic({rol, routes}) {
  let { topicId } = useParams();
  const matchRoutes = routes?.filter((item) => item.text.toLowerCase() === topicId);
  const redirect = topicId !== 'perfil' ? matchRoutes.length === 0 ? true : false : false;
  return (
    <div>
      { redirect && <Redirect to="/404"/> }
      <h3>{topicId}</h3>
    </div>
  );
}

export default Topic;
