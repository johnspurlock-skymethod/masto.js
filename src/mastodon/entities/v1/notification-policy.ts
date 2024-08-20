/**
 * Represents the notification filtering policy of the user.
 */
export interface NotificationPolicy {
  /** Whether to filter notifications from accounts the user is not following. */
  filterNotFollowing: boolean;
  /** Whether to filter notifications from accounts that are not following the user. */
  filterNotFollowers: boolean;
  /** Whether to filter notifications from accounts created in the past 30 days. */
  filterNewAccounts: boolean;
  /** Whether to filter notifications from private mentions. Replies to private mentions initiated by the user, as well as accounts the user follows, are never filtered. */
  filterPrivateMentions: boolean;
  /** Summary of the filtered notifications */
  summary: {
    /** Number of different accounts from which the user has non-dismissed filtered notifications. Capped at 100. Type: Integer */
    pendingRequestsCount: number;
    /** Number of total non-dismissed filtered notifications. May be inaccurate.  */
    pendingNotificationCount: number;
  };
}
