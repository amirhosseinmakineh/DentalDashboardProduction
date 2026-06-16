# Backend follow-up tasks for consultant lead assignment

These tasks are intentionally tracked separately from the frontend PR because they require backend verification and must not be implemented in the Angular UI.

## Consultant attendance and offline lead assignment

Verify whether `SetAvailableCommandHandler` calls `AssignPendingOfflineLeadsAsync` immediately after attendance registration.

If it does not call `AssignPendingOfflineLeadsAsync` directly, document that the existing `BackgroundService` assigns pending offline leads within its configured interval, currently expected to be within 1 minute.

## Lead intake while consultants are offline or busy

Verify that `AddLeadsAsync` sends new leads to `OfflineQueue` when consultants are offline or busy.

