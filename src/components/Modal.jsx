import { lazy, Suspense } from "react";

const ModalWrapper = ({ show, onHide, id, modalType }) => {
  // Capitalize "modalType" to construct the component filename
  const modalName = `Modal${modalType.charAt(0).toUpperCase()}${modalType.slice(
    1
  )}`;

  const Modal = lazy(() => import(`./submodals/${modalName}.jsx`));

  const notJson = modalType != "json";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal show={show} onHide={onHide} {...(notJson && { id })} />
    </Suspense>
  );
};

export default ModalWrapper;
