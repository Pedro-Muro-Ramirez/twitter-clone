import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// Listen for click events on the document
document.addEventListener("click", function (e) {
  // Check if the clicked element is a like button, retweet button, reply button, or tweet button
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

// Handle the like button click
function handleLikeClick(tweetId) {
  // Find the tweet object in the tweetsData array that matches the clicked like button
  tweetsData.forEach(function (tweet) {
    if (tweetId === tweet.uuid) {
      const targetTweetObj = tweet;
      // Toggle the isLiked property and update the likes count
      if (targetTweetObj.isLiked) {
        targetTweetObj.likes--;
      } else {
        targetTweetObj.likes++;
      }
      targetTweetObj.isLiked = !targetTweetObj.isLiked;
      render();
    }
  });
}

// Handle the retweet button click
function handleRetweetClick(tweetId) {
  // Find the tweet object in the tweetsData array that matches the clicked retweet button
  tweetsData.forEach(function (tweet) {
    if (tweetId === tweet.uuid) {
      const tweetObj = tweet;
      // Toggle the isRetweeted property and update the retweets count
      if (tweetObj.isRetweeted) {
        tweetObj.retweets--;
      } else {
        tweetObj.retweets++;
      }
      tweetObj.isRetweeted = !tweetObj.isRetweeted;
      render();
    }
  });
}

// Handle the reply button click
function handleReplyClick(replyId) {
  // Toggle the visibility of the replies section for the clicked reply button
  const replyDiv = document.getElementById(`replies-${replyId}`);
  replyDiv.classList.toggle("hidden");
}

// Handle the tweet button click
function handleTweetBtnClick() {
  // Get the tweet input value and create a new tweet object if the input is not empty
  const tweetInput = document.getElementById("tweet-input");
  if (tweetInput.value) {
    tweetsData.unshift({
      handle: `@Scrimba`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4()
    })
    // Clear the tweet input and re-render the feed
    tweetInput.value = ""
    render()
  }
}

// Create the feed HTML
function getFeedHtml() {
  let feedHtml = ``;
  // Loop through each tweet
  tweetsData.forEach(function (tweet) {
    // Determine the classes for like and retweet icons based on their state
    let likeIconClass = tweet.isLiked ? "liked" : "";
    let retweetIconClass = tweet.isRetweeted ? "retweeted" : "";
    // Loop through each reply
    let repliesHtml = ``;
    if (tweet.replies.length) {
      tweet.replies.forEach(function (reply) {
        // Create the HTML for each reply
        repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>`;
      });
    }
    // Create the HTML for each tweet
    feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div id="replies-${tweet.uuid}" class="hidden">
            ${repliesHtml}
        </div> 
        </div>`;
  });
  return feedHtml;
}

// Render the feed
function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}
render();
