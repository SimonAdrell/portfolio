import * as m from '$lib/paraglide/messages';

type Text = () => string;

export type Ingredient = { name: Text; amount: Text; was?: Text };
export type Dish = { tag: Text; name: Text; text: Text; live?: boolean };
export type Batch = { stamp: Text; meta: Text; name: Text; text: Text };
export type Fact = { name: Text; value: Text };

export const facts: Fact[] = [
	{ name: m.factPrep, value: m.factPrepValue },
	{ name: m.factCook, value: m.factCookValue },
	{ name: m.factRest, value: m.factRestValue },
	{ name: m.factMakes, value: m.factMakesValue },
	{ name: m.factDifficulty, value: m.factDifficultyValue }
];

export const ingredients: Ingredient[] = [
	{ name: m.ingNet, amount: m.ingNetAmt },
	{ name: m.ingAzure, amount: m.ingAzureAmt },
	{ name: m.ingAgents, amount: m.ingAgentsAmt },
	{ name: m.ingAiCert, amount: m.ingAiCertAmt },
	{ name: m.ingAgentCert, amount: m.ingAgentCertAmt },
	{ name: m.ingBus, amount: m.ingBusAmt },
	{ name: m.ingData, amount: m.ingDataAmt },
	{ name: m.ingEs, amount: m.ingEsAmt },
	{ name: m.ingOps, amount: m.ingOpsAmt },
	{ name: m.ingBi, amount: m.ingBiAmt },
	{ name: m.ingTeam, amount: m.ingTeamAmt },
	{ name: m.ingGel, amount: m.ingGelAmt },
	{ name: m.ingFe, amount: m.ingFeAmt },
	{ name: m.ingHand, amount: m.ingHandAmt, was: m.ingHandOldAmt }
];

export const steps: Text[] = [m.step1, m.step2, m.step3, m.step4, m.step5, m.step6, m.step7];

export const howIBuild: Dish[] = [
	{ tag: m.howGuardrailsTag, name: m.howGuardrailsName, text: m.howGuardrailsText, live: true },
	{ tag: m.howParallelTag, name: m.howParallelName, text: m.howParallelText },
	{ tag: m.howCompoundTag, name: m.howCompoundName, text: m.howCompoundText }
];

export const agents: Dish[] = [
	{
		tag: m.agentLampverketTag,
		name: m.agentLampverketName,
		text: m.agentLampverketText,
		live: true
	},
	{ tag: m.agentTriageTag, name: m.agentTriageName, text: m.agentTriageText },
	{ tag: m.agentReScanTag, name: m.agentReScanName, text: m.agentReScanText },
	{
		tag: m.agentProblemSolverTag,
		name: m.agentProblemSolverName,
		text: m.agentProblemSolverText
	}
];

export const batches: Batch[] = [
	{ stamp: m.stampShipped, meta: m.servedSt1Meta, name: m.servedSt1Name, text: m.servedSt1Text },
	{ stamp: m.stampNow, meta: m.servedTolkMeta, name: m.servedTolkName, text: m.servedTolkText },
	{ stamp: m.stampShipped, meta: m.servedSpsmMeta, name: m.servedSpsmName, text: m.servedSpsmText },
	{ stamp: m.stampShipped, meta: m.served365Meta, name: m.served365Name, text: m.served365Text },
	{
		stamp: m.stampShipped,
		meta: m.servedJetshopMeta,
		name: m.servedJetshopName,
		text: m.servedJetshopText
	},
	{
		stamp: m.stampShipped,
		meta: m.servedBilvisionMeta,
		name: m.servedBilvisionName,
		text: m.servedBilvisionText
	}
];

export const nutrition: Fact[] = [
	{ name: m.nutBackend, value: m.nutBackendAmt },
	{ name: m.nutCloud, value: m.nutCloudAmt },
	{ name: m.nutFrontend, value: m.nutFrontendAmt },
	{ name: m.nutAgentic, value: m.nutAgenticAmt },
	{ name: m.nutLanguages, value: m.nutLanguagesAmt },
	{ name: m.nutBugs, value: m.nutBugsAmt }
];
