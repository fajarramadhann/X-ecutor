import {
	Aptos,
	AptosConfig,
	Ed25519PrivateKey,
	HexInput,
	Network,
	PrivateKey,
	PrivateKeyVariants,
} from "@aptos-labs/ts-sdk"
// import { ChatOpenAI } from "@langchain/openai"
// import { ChatAnthropic } from "@langchain/anthropic"
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { config } from "dotenv"
import { AgentRuntime, LocalSigner } from "move-agent-kit"
config()

// export const llm = new ChatOpenAI({
// 	modelName: "gpt-3.5-turbo-instruct",
// 	openAIApiKey: process.env.OPENAI_API_KEY,
// })

// export const llm = new ChatAnthropic({
// 	model: "claude-3-5-haiku",
// 	anthropicApiKey: process.env.ANTHROPIC_API_KEY,
// })

export const llm = new ChatGoogleGenerativeAI({
	model: "gemini-2.0-flash",
	apiKey: process.env.GOOGLE_API_KEY,
});

export const setupAgentKit = async () => {
	const aptosConfig = new AptosConfig({
		network: Network.DEVNET,
	})
	const aptos = new Aptos(aptosConfig)
	const account = await aptos.deriveAccountFromPrivateKey({
		privateKey: new Ed25519PrivateKey(
			PrivateKey.formatPrivateKey(process.env.APTOS_PRIVATE_KEY as HexInput, PrivateKeyVariants.Ed25519)
		),
	})
	const signer = new LocalSigner(account, Network.DEVNET)
	const agentRuntime = new AgentRuntime(signer, aptos)

	return {
		agentRuntime,
		llm,
	}
}
