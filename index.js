import { tweetsData } from "./data.js";

// Initial variables 
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')
const feed = document.getElementById('feed')

// Listen for click events on the tweet button
tweetBtn.addEventListener("click", function(){
    console.log(tweetInput.value)
    tweetInput.value = ''
})


// Listen for click events on the document
document.addEventListener("click", function(e){
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    } else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
})

// Handle the like button click
function handleLikeClick(tweetId) {
    tweetsData.forEach(function(tweet){
        if(tweetId === tweet.uuid){
            const targetTweetObj = tweet
            if(targetTweetObj.isLiked) {
                targetTweetObj.likes--
            } else {
                targetTweetObj.likes++
            }
            targetTweetObj.isLiked = !targetTweetObj.isLiked
            render()
        }
    })
}

function handleRetweetClick(tweetId) {
        tweetsData.forEach(function(tweet){
            if(tweetId === tweet.uuid){
                const tweetObj = tweet
                if(tweetObj.isRetweeted) {
                    tweetObj.retweets--
                } else {
                    tweetObj.retweets++
                }
                tweetObj.isRetweeted = !tweetObj.isRetweeted
                render()
            }
        })
    }

// Create the feed HTML
function getFeedHtml() {
    let feedHtml = ``
    tweetsData.forEach(function(tweet){
        let likeIconClass = tweet.isLiked ? 'liked' : ''
        let retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''
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
        </div>`
    }) 
    return feedHtml
}

// Render the feed
function render() {
    feed.innerHTML = getFeedHtml()
}
render()