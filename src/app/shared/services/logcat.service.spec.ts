import {TestBed} from "@angular/core/testing";

import {LogcatService} from "./logcat.service";

describe("LogcatService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: LogcatService = TestBed.get(LogcatService);
    expect(service).toBeTruthy();
  });
});
