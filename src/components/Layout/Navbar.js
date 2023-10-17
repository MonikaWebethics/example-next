import Link from "next/link";
function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            {/* <img src={logo} height="28" alt="CoolBrand" /> */}
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
              <Link href="/bootcamp" className="nav-item nav-link">
                BootCamp
              </Link>
            </div>
            <div className="navbar-nav ms-auto">
              <button className="nav-item nav-link">Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
