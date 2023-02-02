const NotAuthorized = () => {
    return (
    <>
      <div className="content-container">
        <div className="container p-5">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2 text-center pt-5 mt-5">
              <p className="text-white mb-5 fs-1">Sorry...</p>
              <p className="text-white fs-3">You do not have access to this feature...</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 offset-lg-4 mt-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotAuthorized;