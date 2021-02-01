const snapshotToArray = (snapshot) => {
  let returnArr = [];

  snapshot.forEach((childSnapshot) => {
    let item = childSnapshot.data();
    item.id = childSnapshot.id;

    returnArr.push(item);
  });

  return returnArr;
};

export default snapshotToArray;
