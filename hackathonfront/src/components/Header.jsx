import React, { useEffect, useRef } from "react";
import "./header.css";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const updateActiveItem = (target, horiSelector) => {
  if (!target || !horiSelector) return;
  const activeWidthNewAnimHeight = target.clientHeight;
  const activeWidthNewAnimWidth = target.clientWidth;
  const itemPosNewAnimTop = target.offsetTop;
  const itemPosNewAnimLeft = target.offsetLeft;

  horiSelector.style.top = itemPosNewAnimTop + "px";
  horiSelector.style.left = itemPosNewAnimLeft + "px";
  horiSelector.style.height = activeWidthNewAnimHeight + "px";
  horiSelector.style.width = activeWidthNewAnimWidth + "px";
};

function Header() {
  const navigate = useNavigate();
  const tabsNewAnimRef = useRef(null);
  const horiSelectorRef = useRef(null);
  const router = useLocation();

  function logout() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    if (localStorage.getItem("appState")) {
      localStorage.removeItem("appState");
    }
    navigate("/");
  }
  useEffect(() => {
    if (!tabsNewAnimRef.current || !horiSelectorRef.current) return;
    const tabsNewAnim = tabsNewAnimRef.current;
    const horiSelector = horiSelectorRef.current;

    const handleClick = (e) => {
      const target = e.target.closest("li");
      if (!target) return;
      const lis = tabsNewAnim.querySelectorAll("li");
      lis.forEach((li) => li.classList.remove("active"));
      target.classList.add("active");
      updateActiveItem(target, horiSelector);
    };

    const handleResize = () => {
      updateActiveItem(tabsNewAnim.querySelector(".active"), horiSelector);
    };

    const handleTogglerClick = () => {
      document.querySelector(".navbar-collapse").classList.toggle("show");
      setTimeout(
        () =>
          updateActiveItem(tabsNewAnim.querySelector(".active"), horiSelector),
        0
      );
    };

    tabsNewAnim.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);
    document
      .querySelector(".navbar-toggler")
      .addEventListener("click", handleTogglerClick);

    return () => {
      tabsNewAnim.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      document
        .querySelector(".navbar-toggler")
        .removeEventListener("click", handleTogglerClick);
    };
  }, [tabsNewAnimRef, horiSelectorRef]);

  useEffect(() => {
    const path = router.pathname;
    const target = document.querySelector(
      `#navbarSupportedContent ul li a[href="${path}"]`
    );
    if (target && !target.parentElement.classList.contains("active")) {
      console.log("add active");
      const lis = tabsNewAnimRef.current.querySelectorAll("li");
      lis.forEach((li) => li.classList.remove("active"));
      target.parentElement.classList.add("active");
      updateActiveItem(target.parentElement, horiSelectorRef.current);
    }
  }, [tabsNewAnimRef, horiSelectorRef, router]);

  return (
    <header className="sticky-top header_underline bg-white ">
      <nav className="navbar navbar-expand-custom navbar-mainbg">
        <NavLink className="navbar-brand navbar-logo text-white" to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={"2rem"}
            viewBox="0 0 512 512"
          >
            <path
              d="M 241.983 3.009 C 192.357 6.233, 140.890 26.083, 100.316 57.647 C 88.864 66.556, 69.475 85.366, 61.299 95.500 C 46.986 113.240, 33.579 135.775, 24.633 157.128 C -1.899 220.455, -2.917 286.199, 21.685 347.470 C 30.628 369.743, 45.256 395.073, 59.703 413.303 C 68.324 424.182, 88.267 444.224, 99.500 453.297 C 136.899 483.508, 184.120 502.769, 233.762 508.061 C 247.920 509.570, 279.048 508.765, 292 506.555 C 337.734 498.749, 382.499 478.503, 415.500 450.698 C 427.450 440.629, 445.183 422.563, 453.974 411.500 C 481.576 376.766, 500.504 331.241, 506.569 285 C 509.968 259.088, 507.266 220.458, 500.088 192.343 C 482.741 124.403, 439.488 69.541, 375.259 34.010 C 342.506 15.892, 308.558 5.774, 273 3.533 C 267.775 3.204, 261.250 2.783, 258.500 2.597 C 255.750 2.412, 248.318 2.597, 241.983 3.009 M 230.500 19.076 C 205.377 22.433, 177.570 31.048, 153.500 42.930 C 103.124 67.797, 68.126 102.189, 45.050 149.500 C 20.763 199.292, 13.748 249.390, 23.974 300 C 31.053 335.030, 47.650 372.150, 68.703 400.039 C 104.344 447.249, 159.011 480.327, 219.500 491.284 C 235.657 494.210, 273.287 494.459, 288 491.736 C 332.360 483.526, 370.793 466.737, 401.408 442.196 C 436.898 413.747, 459.844 382.954, 475.829 342.327 C 494.833 294.023, 497.688 247.919, 484.890 196 C 479.417 173.795, 469.081 149.384, 456.670 129.349 C 423.432 75.693, 360.140 33.306, 294.706 20.881 C 285.779 19.186, 278.822 18.691, 260.500 18.447 C 247.850 18.278, 234.350 18.561, 230.500 19.076 M 281.910 77.378 C 280.584 79.235, 275.450 84.121, 270.500 88.234 C 264.847 92.933, 260.198 97.794, 258 101.309 C 256.075 104.386, 254.275 106.901, 254 106.897 C 253.725 106.894, 252.117 104.778, 250.427 102.196 C 248.736 99.613, 243.405 94.277, 238.579 90.338 C 233.753 86.399, 228.689 81.535, 227.326 79.530 C 224.463 75.315, 222.895 75.383, 221.635 79.777 C 220.937 82.213, 221.183 83.731, 222.760 86.699 C 229.280 98.968, 230.038 100.965, 231.036 108.500 C 232.512 119.638, 233.412 122.130, 240.059 133.500 C 248.170 147.374, 249.802 151.820, 252.448 167.250 C 253.472 173.225, 255.472 171.764, 257.923 163.250 C 260.614 153.903, 263.038 149.568, 270.991 139.883 C 274.325 135.822, 278.279 130.025, 279.777 127 C 282.308 121.887, 282.535 120.374, 283 105.500 C 283.449 91.145, 283.731 89.128, 285.750 85.882 C 287.979 82.297, 288.564 78.633, 287.393 75.582 C 286.436 73.089, 284.522 73.716, 281.910 77.378 M 305.142 122.049 C 291.557 134.275, 286.497 140.521, 280.061 153.009 C 274.481 163.836, 262.259 193.943, 259.073 204.710 C 256.748 212.566, 255.377 214.236, 253.435 211.580 C 252.740 210.630, 248.699 199.199, 244.453 186.177 C 233.917 153.861, 230.750 147.230, 220.534 136.107 C 215.554 130.683, 194.582 113, 193.130 113 C 190.622 113, 190.232 116.564, 192.091 122.500 C 193.547 127.146, 193.977 131.659, 194 142.500 C 194.046 164.123, 197.338 174.468, 207.364 184.495 C 212.421 189.551, 221.503 194.653, 232.259 198.480 C 238.570 200.724, 242.152 204.506, 246.717 213.741 L 250.500 221.393 250.848 260.799 C 251.055 284.353, 250.820 300.580, 250.262 301.138 C 249.685 301.715, 248.106 299.293, 246.120 294.785 C 240.368 281.727, 235.200 274.296, 222.991 261.532 C 210.182 248.139, 208.478 245.522, 205.062 234 C 202.105 224.025, 199.283 219.404, 192.080 212.735 C 183.435 204.731, 177.367 202.538, 164 202.587 C 154.458 202.622, 152.496 202.975, 142.500 206.459 C 132.324 210.006, 130.631 210.301, 119.904 210.397 C 108.734 210.496, 105 211.422, 105 214.094 C 105 214.561, 108.713 216.733, 113.250 218.920 C 118.571 221.485, 124.340 225.403, 129.500 229.956 C 133.900 233.839, 140.414 238.474, 143.975 240.258 C 150.185 243.368, 150.920 243.498, 161.975 243.442 C 168.314 243.410, 177.325 243.223, 182 243.027 C 189.156 242.726, 191.133 243.003, 194.500 244.776 C 199.053 247.173, 226.970 276.177, 225.270 276.743 C 224.659 276.947, 221.985 276.030, 219.329 274.705 C 194.349 262.244, 169.171 260.195, 149.261 269.003 C 146.808 270.088, 140.684 273.432, 135.651 276.434 C 130.618 279.436, 122 283.760, 116.500 286.044 C 104.884 290.866, 103.800 291.603, 104.202 294.412 C 104.455 296.182, 105.481 296.621, 110.946 297.294 C 117.254 298.071, 120.699 299.349, 140 308.075 C 148.079 311.728, 150.721 312.435, 157.662 312.806 C 171.003 313.518, 178.815 310.135, 196.684 295.904 C 206.997 287.692, 213.811 284.554, 221.182 284.626 C 227.774 284.689, 230.952 286.394, 234.564 291.805 C 251.160 316.664, 250.993 316.310, 251.021 326.718 C 251.033 330.998, 251.698 344.175, 252.500 356 C 253.302 367.825, 253.967 377.907, 253.979 378.405 C 254.008 379.642, 250.076 375.995, 248.702 373.511 C 248.091 372.405, 247.570 366.963, 247.545 361.418 C 247.501 351.489, 247.444 351.250, 243.788 345.741 C 240.050 340.106, 227.354 329, 224.651 329 C 222.331 329, 220.822 334.720, 220.266 345.615 C 219.379 363.007, 223.440 370.376, 236.678 375.397 C 241.981 377.409, 244.919 379.273, 247.928 382.537 C 254.679 389.861, 253.176 390.579, 239.802 386.416 C 228.229 382.815, 225.193 380.532, 218.538 370.427 C 211.548 359.814, 208.082 356.520, 201.657 354.386 C 195.592 352.372, 189.397 352.965, 181.905 356.278 C 174.733 359.450, 170.256 360.221, 166.033 359.009 C 159.617 357.169, 160.402 359.497, 169.618 369.638 C 174.503 375.014, 180.254 381.111, 182.397 383.188 C 190.742 391.274, 201.347 393.673, 215.006 390.567 L 222.262 388.917 235.249 392.137 C 251.208 396.095, 254.075 397.833, 255.709 404.539 C 264.433 440.353, 266.315 447.720, 267.124 449.232 C 267.832 450.554, 269.308 451, 272.976 451 C 275.674 451, 278.133 450.594, 278.439 450.099 C 278.745 449.603, 278.124 446.341, 277.057 442.849 C 274.056 433.022, 270.184 417.034, 269.463 411.500 C 268.604 404.896, 270.220 402.904, 282.431 395.516 L 291.918 389.776 302.886 390.493 C 319.319 391.566, 321.774 390.537, 335 377.036 C 340.775 371.141, 347.415 364.857, 349.755 363.071 C 352.095 361.285, 353.756 359.414, 353.446 358.912 C 353.136 358.410, 350.889 358, 348.453 358 C 346.017 358, 339.809 356.650, 334.659 355 C 319.453 350.129, 309.648 351.125, 302.163 358.301 C 300.327 360.060, 296.633 366.062, 293.953 371.637 C 288.636 382.701, 284.681 386.987, 275.623 391.501 C 268.099 395.250, 266.249 394.928, 265.545 389.750 C 264.251 380.225, 262.033 348.293, 261.391 329.959 C 260.593 307.139, 260.640 306.956, 270.106 296.625 C 280.483 285.301, 290.724 282.287, 301.500 287.386 C 304.250 288.687, 311 293.245, 316.500 297.515 C 322 301.785, 329.425 306.679, 333 308.389 C 338.955 311.239, 340.338 311.498, 349.500 311.471 C 358.827 311.444, 360.105 311.184, 368.500 307.611 C 386.715 299.859, 392.320 297.870, 397.353 297.377 C 406.251 296.504, 407 296.198, 407 293.437 C 407 291.175, 405.415 290.135, 391.750 283.432 C 383.363 279.319, 372.225 273.720, 367 270.992 C 359.445 267.046, 355.570 265.703, 348.073 264.431 C 332.138 261.729, 319.613 263.945, 297.351 273.410 C 284.197 279.002, 282 279.689, 282 278.210 C 282 277.776, 289.313 270.171, 298.250 261.309 C 317.830 241.895, 317.510 242.048, 334.903 243.787 C 348.519 245.148, 356.805 244.229, 364.519 240.503 C 369.707 237.997, 371.480 236.728, 384.285 226.353 C 389.619 222.031, 393.822 219.557, 398.436 218.021 C 404.064 216.149, 405 215.498, 405 213.464 C 405 210.678, 404.053 210.437, 387.500 209.024 C 379.679 208.356, 373.899 207.185, 367.500 204.973 C 347.072 197.913, 330.776 200.711, 316.937 213.656 C 311.166 219.054, 307.724 225.335, 305.032 235.379 C 302.160 246.097, 300.865 248.285, 292.568 256.439 C 281.233 267.578, 272.414 277.559, 266.793 285.609 C 263.069 290.943, 261.383 292.650, 260.825 291.652 C 260.397 290.887, 260.008 274.659, 259.960 255.589 L 259.874 220.918 263.561 214.324 C 269.618 203.494, 272.915 200.522, 282.310 197.423 C 297.735 192.335, 306.313 186.441, 311.719 177.217 C 316.789 168.565, 317.327 165.676, 318.182 142.500 C 318.629 130.400, 319.108 118.710, 319.247 116.523 C 319.434 113.586, 319.093 112.466, 317.944 112.237 C 317.088 112.067, 311.327 116.482, 305.142 122.049 M 308 371.958 C 306.075 372.987, 302.925 375.494, 301 377.529 C 297.722 380.996, 297.658 381.183, 300 380.487 C 304.258 379.222, 310.751 375.030, 312.437 372.455 C 314.420 369.429, 313.025 369.273, 308 371.958 M 197.653 372.537 C 197.977 373.382, 199.611 374.782, 201.284 375.647 C 206.024 378.098, 215 380.985, 215 380.058 C 215 379.139, 199.839 371, 198.129 371 C 197.542 371, 197.328 371.692, 197.653 372.537"
              stroke="none"
              fill="#5161ce"
              fillRule="evenodd"
            />
          </svg>
        </NavLink>
        <button
          className="navbar-toggler me-3 btn btn-outline-white "
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            height={"1.5rem"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end "
          ref={tabsNewAnimRef}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector" ref={horiSelectorRef}>
              <div className="left"></div>
              <div className="right"></div>
            </div>

            <li className="nav-item">
              {/* <a className="nav-link" href={item} > */}
              <NavLink className="nav-link" to={"/"}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              {/* <a className="nav-link" href={item} > */}
              <NavLink className="nav-link" to={"requests"}>
                Request
              </NavLink>
            </li>
            {!localStorage.getItem("token") ? (
              <>
                <li className="nav-item">
                  {/* <a className="nav-link" href={item} > */}
                  <NavLink className="nav-link" to={"signin"}>
                    Sign in
                  </NavLink>
                </li>

                <li className="nav-item">
                  {/* <a className="nav-link" href={item} > */}
                  <NavLink className="nav-link" to={"signup"}>
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  {/* <a className="nav-link" href={item} > */}
                  <NavLink className="nav-link" to={"profile"}>
                    My profile
                  </NavLink>
                </li>
                <li className="z-3 mx-3  align-content-center ">
                  <button className="btn btn-outline-dark " onClick={logout}>
                    Log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
