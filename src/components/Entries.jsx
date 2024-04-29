import { useUserDataSignal } from "../hooks/useUserDataSignal";

const Entries = () => {
  const { userDataSignal } = useUserDataSignal();
  console.log(">>>>");
  console.log(userDataSignal);
  return (
    <>
      <h2>Entries</h2>
      <p>{userDataSignal?.data?.message}</p>
      <ul>
        {/* {userDataSignal?.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))} */}
      </ul>
    </>
  );
};

export default Entries;
