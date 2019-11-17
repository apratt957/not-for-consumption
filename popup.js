const addressSubmit = document.getElementById('addressSubmit');

addressSubmit.addEventListener('click', async function findHome() {
  const randomNum = Math.floor(Math.random() * 10000);
  await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=MOV${randomNum}&type=video&key=AIzaSyBi3F8awhualQdnsvRm7Y0A3sJN1LabhEY`
  )
    .then(response => response.json())
    .then(response => (videos = response.items));

  if (!videos.length) {
    alert('Try again!');
  }

  let randomVid = Math.floor(Math.random() * videos.length);
  let currentVidTitle = videos[randomVid].snippet.title;

  while (!currentVidTitle.includes('MOV')) {
    randomVid = Math.floor(Math.random() * videos.length);
    currentVidTitle = videos[randomVid].snippet.title;
  }

  chrome.tabs.create({
    url: `https://www.youtube.com/watch?v=${videos[randomVid].id.videoId}`
  });
});
