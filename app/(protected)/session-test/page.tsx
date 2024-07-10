import { auth } from "@/auth";

const TestPage = async () => {

    const session = await auth();
    return (
        <div className="">
            {JSON.stringify(session)}
        </div>
    );

}

export default TestPage;