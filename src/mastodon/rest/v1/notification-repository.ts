import { type HttpMetaParams } from "../../../interfaces";
import {
  type Notification,
  type NotificationPolicy,
  type NotificationRequest,
  type NotificationType,
} from "../../entities/v1";
import { type Paginator } from "../../paginator";
import { type DefaultPaginationParams } from "../../repository";

export interface ListNotificationsParams extends DefaultPaginationParams {
  /** Instead of specifying every known type to exclude, you can specify only the types you want. */
  readonly types?: readonly NotificationType[] | null;
  /** ID of the account */
  readonly accountId?: string | null;
  /** Array of notifications to exclude (Allowed values: "follow", "favourite", "reblog", "mention") */
  readonly excludeTypes?: readonly NotificationType[] | null;
}

export interface UpdateNotificationPolicyParams {
  /** Whether to filter notifications from accounts the user is not following. */
  readonly filterNotFolliwng?: boolean;
  /** Whether to filter notifications from accounts that are not following the user. */
  readonly filterNotFollowers?: boolean;
  /** Whether to filter notifications from accounts created in the past 30 days. */
  readonly filterNewAccounts?: boolean;
  /** Whether to filter notifications from private mentions. Replies to private mentions initiated by the user, as well as accounts the user follows, are never filtered. */
  readonly filterPrivateMentions?: boolean;
}

export interface NotificationRepository {
  /**
   * Notifications concerning the user.
   * This API returns Link headers containing links to the next/previous page.
   * However, the links can also be constructed dynamically using query params and `id` values.
   * @param params Query parameter
   * @return Array of Notification
   * @see https://docs.joinmastodon.org/methods/notifications/
   */
  list(
    params?: ListNotificationsParams,
    meta?: HttpMetaParams<"json">,
  ): Paginator<Notification[], ListNotificationsParams>;

  $select(id: string): {
    /**
     * View information about a notification with a given ID.
     * @return Notification
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    fetch(meta?: HttpMetaParams): Promise<Notification>;

    /**
     * Clear a single notification from the server.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    dismiss(meta?: HttpMetaParams): Promise<void>;
  };

  /**
   * Clear all notifications from the server.
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/notifications/
   */
  clear(meta?: HttpMetaParams): Promise<void>;

  policy: {
    /**
     * Notifications filtering policy for the user.
     */
    fetch(meta?: HttpMetaParams): Promise<NotificationPolicy>;

    /**
     * Update the user’s notifications filtering policy.
     */
    update(
      params: UpdateNotificationPolicyParams,
      meta?: HttpMetaParams<"json">,
    ): Promise<NotificationPolicy>;
  };

  requests: {
    fetch(
      params: DefaultPaginationParams,
      meta?: HttpMetaParams<"json">,
    ): Paginator<NotificationRequest[], DefaultPaginationParams>;

    $select(id: string): {
      /**
       * View information about a notification request with a given ID.
       */
      fetch(meta?: HttpMetaParams): Promise<NotificationRequest>;

      /**
       * Accept a notification request, which merges the filtered notifications from that user back into the main notification and accepts any future notification from them.
       */
      accept(meta?: HttpMetaParams): Promise<void>;

      /**
       * Dismiss a notification request, which hides it and prevent it from contributing to the pending notification requests count.
       */
      dismiss(meta?: HttpMetaParams): Promise<void>;
    };
  };
}
