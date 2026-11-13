import { describe, expect, it } from 'vitest';
import en from '../messages/en.json';
import sv from '../messages/sv.json';

const keys = (m: Record<string, string>) => Object.keys(m).filter((k) => k !== '$schema');

// Names and numbers that read the same in both languages.
const sameInBoth = new Set([
	'recipeTitleSite',
	'signature',
	'agentReScanTag',
	'servedTolkName',
	'ingAzure',
	'ingAgents',
	'ingAiCert',
	'ingAgentCert',
	'ingBus',
	'ingData',
	'ingEs',
	'ingOps',
	'ingBi',
	'ingTeam',
	'ingFe',
	'agentLampverketName',
	'agentReScanName',
	'agentProblemSolverName',
	'servedSt1Meta',
	'servedTolkMeta',
	'servedSpsmMeta',
	'servedSpsmName',
	'served365Meta',
	'servedJetshopMeta',
	'servedBilvisionMeta',
	'nutBackend',
	'nutBackendAmt',
	'nutCloudAmt',
	'nutFrontendAmt',
	'linkedIn',
	'contactEmail',
	'contactLinkedIn'
]);

describe('messages', () => {
	it('English and Swedish have the same keys', () => {
		expect(keys(sv).sort()).toEqual(keys(en).sort());
	});

	it('every Swedish text is translated', () => {
		const untranslated = keys(en).filter(
			(k) =>
				!sameInBoth.has(k) &&
				(en as Record<string, string>)[k] === (sv as Record<string, string>)[k]
		);
		expect(untranslated).toEqual([]);
	});
});
