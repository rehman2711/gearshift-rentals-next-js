export default function Loading() {
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
  