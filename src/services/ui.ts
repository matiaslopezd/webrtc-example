import { Subject } from "rxjs";
import { InitSubject } from "./init";
import { RemoteMediaSubject } from "./media";
import { ClientSubject } from "./rtc";

export const RequestClickSubject1 = new Subject();
export const RequestClickSubject2 = new Subject();

const addLocalVideo = (stream: MediaStream) => {
  var localVideo = document.querySelector("#localVideo") as HTMLVideoElement;
  if (!localVideo) return;
  localVideo.srcObject = stream;
};

export const addRemoteVideo = (stream: MediaStream) => {
  const videoElement = document.createElement("video");
  videoElement.setAttribute("autoplay", "");
  videoElement.setAttribute("playsinline", "");
  const videos = document.querySelector("#videos");
  if (!videos) return;
  videos.append(videoElement);
  videoElement.srcObject = stream;
};

InitSubject.subscribe(() => {
  RemoteMediaSubject.subscribe((stream) => {
    if (!stream) return;
    addRemoteVideo(stream);
  });
  ClientSubject.subscribe((client) => {
    client?.OnStreamSubject.subscribe((message) => addRemoteVideo(message[1]));
  });
});
