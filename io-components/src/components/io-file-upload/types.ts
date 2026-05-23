/** Payload emitted by the fileSelect event */
export type IoFileSelectDetail = {
  files: File[];
};

/** Payload emitted by the fileReject event */
export type IoFileRejectDetail = {
  file: File;
  reason: 'size' | 'type';
};
