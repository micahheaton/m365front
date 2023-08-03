// The RecommendedActions component is responsible for displaying statistics and performing
// calculations on recommended actions data. It accepts `recommendedActionsDataProp` as a prop.
export default function RecommendedActions({ recommendedActionsDataProp }) {
  // `useLocation` hook is used to access the state passed from the previous page
  const { state } = useLocation();

  // If data is passed as a prop, use that, else use the data from location state.
  const recommendedActionsData = recommendedActionsDataProp
    ? recommendedActionsDataProp
    : state.recommendedActionsData;

  const navigate = useNavigate();

  // data is local state holding our data to display
  const [data, setData] = useState(recommendedActionsData);

  // open is a boolean state used to control the visibility of a modal
  const [open, setOpen] = useState(false);

  // ra and hra hold statistics about recommended actions and high impact recommended actions respectively
  const [ra, setRa] = useState({ achieved: 0, total: 0 });
  const [hra, setHra] = useState({ achieved: 0, total: 0 });

  // weigtedResult is a state to hold the result of a weighted percentage calculation
  const [weigtedResult, setWeightedResult] = useState(0);

  // calculateWeightenedPercentage is a function that calculates and sets the value of the weightedResult
  const calculateWeightenedPercentage = () => {
    const weigh =
      (ra.achieved / ra.total) * 0.25 + (hra.achieved / hra.total) * 0.75;
    console.log("weigh", weigh);
    setWeightedResult(weigh);
  };

  // useEffect hook to calculate the weighted percentage whenever ra or hra state changes
  useEffect(() => {
    calculateWeightenedPercentage();
  }, [ra, hra]);

  // useEffect hook to set the initial data state and if data is null, navigate back to the root ("/")
  useEffect(() => {
    if (recommendedActionsData !== null) {
      setData(recommendedActionsData);
    } else {
      navigate("/");
    }
  }, []);

  // Component return JSX
  return (
    // Render only if data is available
    data && (
      <div className="bg-white-200">
        <div className="recom-action-container">
          {/* Breadcrumbs */}
          <div className="flex-row justify-between mb-20">
            <Link to="/" className="breadcrumbs">
              {/* ... */}
            </Link>
            {/* Button to open the average modal */}
            <div
              className="avg-btn"
              onClick={() => {
                setOpen(true);
              }}
            >
              Display Average
            </div>
          </div>
          {/* Modal for displaying the average */}
          <ModalAverage
            open={open}
            setOpen={setOpen}
            weigtedResult={weigtedResult.toFixed(3)}
          />
          {/* Wrapper for the actions */}
          <div className="recom-action-wrapper">
            {/* Recommended Actions */}
            <RcmdActions setRa={setRa} fuld={data.recommended} />
            {/* High Impact Recommended Actions */}
            <HighImpactRcmdActions setHra={setHra} fuld={data.highImpact} />
          </div>
        </div>
        {/* Bottom section */}
        <BottomSection data={[...data.highImpact, ...data.recommended]} />
      </div>
    )
  );
}