import { useDispatch, useSelector } from "react-redux";
import { setGlobalData } from "./features/globalDataSlice";
import { connected, disconnected } from "./features/networkBoolSlice";
import { enablePanel, disablePanel, setModalType } from "./features/uiSlice";
import Tooltip from "./components/Tooltip";
import Card from "./components/Card";
import InputableElement from "./components/InputableElement";
import { useSignals } from "@preact/signals-react/runtime";
import { usePrivateAxios } from "./hooks/usePrivateAxios";
import { useUserDataSignal } from "./hooks/useUserDataSignal";
import { Suspense, lazy, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const Panel = lazy(() => import("./components/Panel"));
const Modal = lazy(() => import("./components/Modal"));

function App() {
  useSignals();

  const [targetID, setTargetID] = useState(null);

  const privateAxios = usePrivateAxios();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.globalData);
  const { isTooltipEnabled, isPanelEnabled, isPanelHovered, modalType } =
    useSelector((state) => state.ui);

  const { setUserDataSignal } = useUserDataSignal();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await privateAxios.get("/entries"); //list of entries (_id, userID, name, value)
        dispatch(setGlobalData(response.data[0].value));
        setUserDataSignal(response.data);
        dispatch(connected());
      } catch (err) {
        err.response ? dispatch(connected()) : dispatch(disconnected());
        const log = err.response ? err.response.data.message : err.message;
        console.log("Fetching error:", log);
      }
    };
    fetchEntries();
  }, []);

  // triggers Panel
  useEffect(() => {
    if (modalType === "blank") {
      const panelTrigger = (event) => {
        if (event.clientX < 30 || isPanelHovered) {
          dispatch(enablePanel());
        } else {
          dispatch(disablePanel());
        }
      };
      window.addEventListener("mousemove", panelTrigger);
      return () => {
        window.removeEventListener("mousemove", panelTrigger);
      };
    }
  }, [dispatch, isPanelEnabled, isPanelHovered, modalType]);

  const handleShowCard = (id, type) => {
    setTargetID(id);
    dispatch(setModalType(type));
  };

  const modalOnHide = () => {
    dispatch(setModalType("blank"));
  };

  return (
    <>
      <Suspense fallback={<></>}>
        {modalType !== "blank" && (
          <Modal
            show={modalType !== "blank"}
            onHide={modalOnHide}
            id={targetID}
            modalType={modalType}
          />
        )}

        {isPanelEnabled && <Panel />}
      </Suspense>

      {isTooltipEnabled && <Tooltip />}
      <main id="pageContent" className={`container`}>
        <header className="row">
          <div className="col-md-7 text-start">
            <InputableElement field="name" as="h1" />

            <InputableElement field="role" as="h2" />

            <InputableElement field="education" as="p" classes="boldText" />
          </div>

          <div className="col-md-5 text-end">
            <InputableElement field="contactLink_1" as="span" />
            <br />
            <InputableElement field="contactLink_2" as="span" />
            <br />
            <InputableElement field="contactLink_3" as="span" />
          </div>
        </header>

        <section className="row m-auto">
          <InputableElement
            field="summaryTitle"
            as="h3"
            classes="text-center"
          />

          <InputableElement field="summaryText" as="p" classes="text-center" />
        </section>

        <section className="row">
          <div className="col-md-7">
            <InputableElement field="stackTitle" as="h3" />

            <div
              className="hoverFX"
              onClick={() => handleShowCard("stackList", "dynamic")}
            >
              {/* Stack section filler */}
              {data.stackList.values.map((item, key) => {
                return (
                  <p key={key} className="mb-0">
                    <strong>{item[0]}</strong>
                    {/* add whitespace */}
                    {` ${item[1]}`}
                    <br />
                  </p>
                );
              })}
            </div>
          </div>

          <div className="col-md-5 text-end">
            <InputableElement field="langTitle" as="h3" />

            <div
              className="hoverFX"
              onClick={() => handleShowCard("langList", "dynamic")}
            >
              {/* Languages section filler */}
              {data.langList.values.map((item, key) => {
                return (
                  <p key={key} className="mb-0">
                    <strong>{item[0]}</strong>
                    {/* add whitespace and brackets */}
                    {` (${item[1]})`}
                    <br />
                  </p>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className="row">
            <div className="col-md-12 text-center">
              <InputableElement field="projectsSectionTitle" as="h3" />

              {/* Projects section summary (if provided) */}
              {data.projectsSectionSummary.value && (
                <InputableElement field="projectsSectionSummary" as="span" />
              )}
            </div>
          </div>

          {/* Projects itself */}
          <div className="row d-flex flex-row">
            <Card
              content={data.project_1}
              handleClick={() => handleShowCard("project_1", "static")}
            />
            <Card
              content={data.project_2}
              handleClick={() => handleShowCard("project_2", "static")}
            />
            <Card
              content={data.project_3}
              handleClick={() => handleShowCard("project_3", "static")}
            />
          </div>
        </section>
        <section>
          <div className="row d-flex flex-row">
            {/* Title for experience section */}

            <InputableElement
              field="experienceTitle"
              as="h3"
              classes="text-center"
            />

            {/* Summary for experience section (if provided) */}
            {data.experienceSubtitle.value && (
              <InputableElement
                field="experienceSubtitle"
                as="p"
                classes="text-center"
              />
            )}
            <Card
              content={data.experiencePeriodLatest}
              handleClick={() =>
                handleShowCard("experiencePeriodLatest", "static")
              }
            />
            <Card
              content={data.experiencePeriodPrevious}
              handleClick={() =>
                handleShowCard("experiencePeriodPrevious", "static")
              }
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
