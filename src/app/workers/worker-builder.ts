

export interface WorkerInfo {
  url : string;
  type : string;
  worker : any;
}

export class WorkerBuilder {
  static build(workerCode: Function) : WorkerInfo {
    const blob = new Blob([workerCode.toString()], { type : 'application/javascript'});
    const url = URL.createObjectURL(blob);
    return {
      url,
      type : 'SHARED',
      worker : new SharedWorker(url)
    };
  }
}
