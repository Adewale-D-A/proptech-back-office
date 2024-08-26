import { Helmet } from "react-helmet-async";

interface metaProps {
  title?: string;
  description?: string;
}
export default function MetaTags({ title, description }: metaProps) {
  return (
    <Helmet prioritizeSeoTags>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>iBASS | {title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
