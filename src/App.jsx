import { useDispatch, useSelector } from "react-redux";
import { setGlobalData } from "./features/globalData/globalDataSlice";
import {
  connected,
  disconnected,
} from "./features/networkBool/networkBoolSlice";
import {
  isPanelEnabled,
  isPanelHovered,
  isTooltipEnabled,
  isExported,
  modalType,
} from "./signals/states";
import Tooltip from "./components/Tooltip";
import Card from "./components/Card";
import InputableElement from "./components/InputableElement";
import { useSignals } from "@preact/signals-react/runtime";
import { effect } from "@preact/signals-react";
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

  const { setUserDataSignal } = useUserDataSignal();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await privateAxios.get("/entries"); //list of entries (_id, userID, name, value)
        dispatch(setGlobalData(response.data[0].value));
        setUserDataSignal(response.data);
        dispatch(connected());
        console.log("Fetched successfully");
      } catch (err) {
        err.response ? dispatch(connected()) : dispatch(disconnected());
        const log = err.response ? err.response.data.message : err.message;
        console.log("Fetching error:", log);
      }
    };
    fetchEntries();
  }, []);

  //triggers Panel
  effect(() => {
    if (modalType.value === "blank") {
      const panelTrigger = (event) => {
        isPanelEnabled.value = event.clientX < 30 || isPanelHovered.value;
      };
      window.addEventListener("mousemove", panelTrigger);
      return () => {
        window.removeEventListener("mousemove", panelTrigger);
      };
    }
  });

  const handleShowCard = (id, type) => {
    setTargetID(id);
    modalType.value = type;
  };

  return (
    <>
      <Suspense fallback={<></>}>
        {modalType.value !== "blank" && (
          <Modal
            show={modalType.value !== "blank"}
            onHide={() => (modalType.value = "blank")}
            id={targetID}
            modalType={modalType.value}
          />
        )}
        {isPanelEnabled.value && <Panel />}
      </Suspense>

      {isTooltipEnabled.value && <Tooltip />}
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
              isExported={isExported.value}
              handleClick={() => handleShowCard("project_1", "static")}
            />
            <Card
              content={data.project_2}
              isExported={isExported.value}
              handleClick={() => handleShowCard("project_2", "static")}
            />
            <Card
              content={data.project_3}
              isExported={isExported.value}
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
              isExported={isExported.value}
              handleClick={() =>
                handleShowCard("experiencePeriodLatest", "static")
              }
            />
            <Card
              content={data.experiencePeriodPrevious}
              isExported={isExported.value}
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
