export type Task = {
  /** 識別子 */
  id: string;
  /** タスク名 */
  name: string;
  /** メモ */
  note?: string;
  /** 完了日時 */
  completedAt?: number;
  /** 開始日時 */
  startedAt?: number;
  /** 終了日時 */
  finishedAt?: number;
  /** 見積もり時間（時間） */
  estimatedTime?: number;
  /** 実績時間（時間） */
  actualTime?: number;
  /** 子タスク */
  children: Task[];
};
