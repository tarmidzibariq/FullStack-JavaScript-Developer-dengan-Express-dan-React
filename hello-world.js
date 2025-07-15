const done = true;

const task = new Promise((resolve, reject) => {
  if (done) {
	resolve('Task completed successfully!');
  } else {
	reject('Task failed.');
  }
});

task
  .then((response) => console.log(response))
  .catch((response) => console.response(response));