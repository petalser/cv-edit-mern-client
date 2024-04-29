import { signalData } from "./signals/data";
import {
  isPanelEnabled,
  isPanelHovered,
  isTooltipEnabled,
  isExported,
  modalType,
} from "./signals/states";
import Tooltip from "./components/Tooltip";
import Card from "./components/Card";
import { showInput } from "./utils/showInput";
import { useSignals } from "@preact/signals-react/runtime";
import { effect } from "@preact/signals-react";
import { usePrivateAxios } from "./hooks/usePrivateAxios";
import { useUserDataSignal } from "./hooks/useUserDataSignal";
import React, { Suspense, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const Panel = React.lazy(() => import("./components/Panel"));
const Modal = React.lazy(() => import("./components/Modal"));

function App() {
  useSignals();

  let data = signalData.value;

  const [targetID, setTargetID] = useState(null);

  const privateAxios = usePrivateAxios();
  const { setUserDataSignal } = useUserDataSignal();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await privateAxios.get("/entries");
        setUserDataSignal(response.data);
      } catch (err) {
        setUserDataSignal(err.response, "error useffect");
      }
    };
    fetchEntries();
  }, []);

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
            <h1 id="name" className="hoverFX" onClick={showInput}>
              {/* First and last name */}
              {data.name.value}
            </h1>

            <h2 id="role" className="hoverFX" onClick={showInput}>
              {/* Role */}
              {data.role.value}
            </h2>

            <p id="education" className="hoverFX boldText" onClick={showInput}>
              {/* Education */}
              {data.education.value}
            </p>
          </div>

          <div className="col-md-5 text-end">
            <span id="contactLink_1" className="hoverFX" onClick={showInput}>
              {/* Contacts[] */}
              {data.contactLink_1.value}
            </span>
            <br />

            <span id="contactLink_2" className="hoverFX" onClick={showInput}>
              {/* Contacts[] */}
              {data.contactLink_2.value}
            </span>
            <br />

            <span id="contactLink_3" className="hoverFX" onClick={showInput}>
              {/* Contacts[] */}
              {data.contactLink_3.value}
            </span>
          </div>
        </header>

        <section className="row m-auto">
          <h3
            id="summaryTitle"
            className="text-center hoverFX"
            onClick={showInput}
          >
            {/* Summary title */}
            {data.summaryTitle.value}
          </h3>

          <p
            id="summaryText"
            className="text-center hoverFX"
            onClick={showInput}
          >
            {/* Summary itself */}
            {data.summaryText.value}
          </p>
        </section>

        <section className="row">
          <div className="col-md-7">
            <h3 id="stackTitle" className=" hoverFX" onClick={showInput}>
              {/* Title for stack section */}
              {data.stackTitle.value}
            </h3>
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
            <h3 id="langTitle" className=" hoverFX" onClick={showInput}>
              {/* Title for languages section */}
              {data.langTitle.value}
            </h3>
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
              <h3
                id="projectsSectionTitle"
                className="hoverFX"
                onClick={showInput}
              >
                {/* Title for projects section */}
                {data.projectsSectionTitle.value}
              </h3>
              {/* Projects section summary (if provided) */}
              {data.projectsSectionSummary.value && (
                <span
                  id="projectsSectionSummary"
                  className="hoverFX"
                  onClick={showInput}
                >
                  {data.projectsSectionSummary.value}
                </span>
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
            <h3 className="text-center hoverFX" onClick={showInput}>
              {data.experienceTitle.value}
            </h3>
            {/* Summary for experience section (if provided) */}
            {data.experienceSubtitle.value && (
              <p className="hoverFX text-center">
                {data.experienceSubtitle.value}
              </p>
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
