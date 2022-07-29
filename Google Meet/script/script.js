"use strict";

const imgs = ["img2.svg", "img3.svg", "img1.svg"];
const headers = [
  "Plan ahead",
  "Your meeting is safe",
  "Get a link you can share",
];
const sub = [
  "Click  New meeting to schedule meetings in Google Calendar and send invites to participants",
  "No one can join a meeting unless invited or admitted by the host",
  "Click New Meeting to get link you can send to people you want to meet with",
];
const rndImg = document.querySelector(".rnd-img");

const aleft = document.querySelector(".arrow-left");
const aright = document.querySelector(".arrow-right");
const heading = document.querySelector(".main-right-span1");
const subh = document.querySelector(".main-right-span2");
const dateSpan = document.querySelector(".date-span");

const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let indexctr = 0;

const changeImg = function () {
  console.log(indexctr);

  rndImg.src = `./img/${imgs[indexctr]}`;
  heading.textContent = `${headers[indexctr]}`;
  subh.textContent = `${sub[indexctr]}`;
  indexctr++;

  if (indexctr === 3) {
    indexctr = 0;
  }
};

const today = new Date();
const dateString = `${today.getHours() > 12 ? "0" : ""}${
  today.getHours() % 12
}: ${today.getMinutes()} ${today.getHours() > 12 ? "PM" : "AM"}   ${
  day[today.getDay() + 1]
}, ${month[today.getMonth() + 1]} ${today.getDate()}`;

aleft.addEventListener("click", changeImg);
aright.addEventListener("click", changeImg);
dateSpan.textContent = dateString;
