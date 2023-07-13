import "./PageContent.scss";

type Props = {
  children: JSX.Element;
};

const PageContent = (props: Props): JSX.Element => {
  return <div className="page-content">{props.children}</div>;
};

export default PageContent;
