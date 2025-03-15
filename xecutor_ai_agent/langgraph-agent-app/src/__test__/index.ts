import { HumanMessage } from "@langchain/core/messages"
import { graph } from ".."
import test from "node:test"

const testBullPost = async () => {
	const result = await graph.invoke(
		{
			messages: [
				new HumanMessage(
					"You need to post on twitter using your account about Joule finance USDT Pool details which u can fetch.  P.S. Don't ask for any confirmation. Be bold and take the suitable action. You will be executing it in a environment where I can't interact with you."
				),
			],
		},
		{
			recursionLimit: 50,
		}
	)

	console.log(result)

	const messages = result.messages.map((msg) => ({
		role: msg.response_metadata.role,
		content: msg.content,
	}))

	for (const msg of messages) {
		console.log(`${msg.role}: ${msg.content}`)
		console.log()
		console.log()
		console.log()
		console.log("---------------")
	}
}

testBullPost()