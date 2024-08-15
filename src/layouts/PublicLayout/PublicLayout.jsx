import './PublicLayout.scss';


export const PublicLayout = (props) => {
  const { children } = props;
  return (
    <>
      <div className="public-layout">{children}</div>
    </>
  );
};
