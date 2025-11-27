export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class DuplicateStoreIdError extends Error {
  errorCode = "U002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class NoExistsStoreError extends Error {
  errorCode = "U003";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class MissionAlreadyInProgressError extends Error {
  errorCode = "U004";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class ChallengeNotFoundError extends Error {
  errorCode = "U005";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class ChallengeAlreadyCompletedError extends Error {
  errorCode = "U006";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class ScoreNotProvidedError extends Error {
  errorCode = "U007";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class ScoreOutOfRangeError extends Error {
  errorCode = "U008";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class UnauthorizedRoleError extends Error {
  errorCode = "U009";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
