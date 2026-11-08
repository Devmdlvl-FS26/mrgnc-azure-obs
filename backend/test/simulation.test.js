import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDispatchResult } from '../src/lib/simulation.js';

test('a completed call returns HTTP 200 and keeps its correlation ID', () => {
  const result = buildDispatchResult({ requestId: 'REQ-001', correlationId: 'corr-001', plannedOutcome: 'Completed' });
  assert.equal(result.httpCode, 200);
  assert.equal(result.payload.outcome, 'Completed');
  assert.equal(result.payload.correlationId, 'corr-001');
});

test('a forced timeout returns the expected simulated failure', () => {
  const result = buildDispatchResult({ plannedOutcome: 'Timed Out' });
  assert.equal(result.httpCode, 504);
  assert.equal(result.payload.outcome, 'Timed Out');
  assert.equal(result.payload.operatorName, null);
});

test('a forced interrupted call returns a gateway error outcome', () => {
  const result = buildDispatchResult({ plannedOutcome: 'Failed' });
  assert.equal(result.httpCode, 502);
  assert.equal(result.payload.outcome, 'Failed');
});
