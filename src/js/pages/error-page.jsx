import { Helmet } from 'react-helmet';
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Helmet>
        <title>FLProductions | Error</title>
      </Helmet>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}