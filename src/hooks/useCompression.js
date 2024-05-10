export const useCompression = () => {
  const compress = (v) => {
    let result = {};
    for (let item in v) {
      if (v[item]["value"]) {
        result[item] = v[item].value;
      } else if (v[item]["values"]) {
        result[item] = v[item].values;
      } else {
        const arr = [];
        for (let key in v[item]) {
          arr.push(v[item][key].value);
        }

        result[item] = arr;
      }
    }

    return result;
    //   "name",
    //   "role",
    //   "education",
    //   "contactLink_1",
    //   "contactLink_2",
    //   "contactLink_3",
    //   "summaryTitle",
    //   "summaryText",
    //   "stackTitle",
    //   "langTitle",
    //   "projectsSectionTitle",
    //   "projectsSectionSummary",
    //   "experienceTitle",
    //   "experienceSubitle",
    // ].map((item) => (result[item] = v[item].value));

    // result.stackList = v.stackList.values;
    // result.langList = v.langList.values;

    //  [
    //   "project_1",
    //   "project_2",
    //   "project_3",
    //   "experiencePeriodLatest",
    //   "experiencePeriodPrevious",
    // ].map(item => Object.keys(v[item]))
    // .

    // result.project_1 = [
    //   v.project_1.title.value,
    //   v.project_1.subtitle.value,
    //   v.project_1.link.value,
    // ];
    // result.project_2 = [
    //   v.project_2.title.value,
    //   v.project_2.subtitle.value,
    //   v.project_2.link.value,
    // ];
    // result.project_3 = [
    //   v.project_3.title.value,
    //   v.project_3.subtitle.value,
    //   v.project_3.link.value,
    // ];

    // return result;
  };

  const decompress = (value) => {};

  return { compress, decompress };
};
