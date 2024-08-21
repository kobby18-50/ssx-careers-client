import { Button, Label, TextInput } from "flowbite-react";

const IPOPage = () => {
    return ( 

        <section className="grid grid-cols-2 p-20">

<h1>Create IPO</h1>

<form className="flex max-w-md flex-col gap-4">
    <div>
        <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
        </div>
        <TextInput id="name" type="text" placeholder="name" required />
    </div>
    <div>
        <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
    </div>
    <div>
        <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required />
    </div>
    
    <Button type="submit">Submit</Button>

</form>

</section>
     );
}
 
export default IPOPage;