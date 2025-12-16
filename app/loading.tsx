export default function Loading() {

  /* HTML: <div class="loader"></div> */
// .loader {
//   width: 40px;
//   aspect-ratio: 1;
//   color: #f03355;
//   position: relative;
//   background: radial-gradient(10px,currentColor 94%,#0000);
// }
// .loader:before {
//   content: '';
//   position: absolute;
//   inset: 0;
//   border-radius: 50%;
//   background:
//     radial-gradient(9px at bottom right,#0000 94%,currentColor) top    left,
//     radial-gradient(9px at bottom left ,#0000 94%,currentColor) top    right,
//     radial-gradient(9px at top    right,#0000 94%,currentColor) bottom left,
//     radial-gradient(9px at top    left ,#0000 94%,currentColor) bottom right;
//   background-size: 20px 20px;
//   background-repeat: no-repeat;
//   animation: l18 1.5s infinite cubic-bezier(0.3,1,0,1);
// }
// @keyframes l18 {
//    33%  {inset:-10px;transform: rotate(0deg)}
//    66%  {inset:-10px;transform: rotate(90deg)}
//    100% {inset:0    ;transform: rotate(90deg)}
// }
    return (
      <div className="h-screen flex justify-center items-center">
        <svg
          version="1.1"
          id="L2"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 100 100"
          xmlSpace="preserve"
          className="w-20 h-20 text-gray-700"
        >
          {/* Outer circle */}
          <circle
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeMiterlimit="10"
            cx="50"
            cy="50"
            r="46"
          />
  
          {/* Fast rotating hand */}
          <line
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="50"
            y1="50"
            x2="88"
            y2="50.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="2s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
  
          {/* Slow rotating hand */}
          <line
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="50"
            y1="50"
            x2="49.5"
            y2="78"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="15s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
        </svg>
      </div>
    );
  }
  