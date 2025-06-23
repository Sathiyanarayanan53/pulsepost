import React from 'react'
import * as XLSX from 'xlsx'

const Home = ({ handlemsg, msg, send, subject, setSubject, status, emails, setEmails }) => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const emailList = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
            const emailAddresses = emailList.map((row) => row.A).filter(Boolean);
            console.log(emailAddresses);
            setEmails(emailAddresses);
        };
        reader.readAsBinaryString(file);
}; 

return (
    <> <nav className="text-2xl font-bold p-4 font-serif border-b-2 shadow-xl bg-white">
        <h1 >Pulse Post</h1>
    </nav>
        <section className=" max-w-xs md:max-w-screen-sm mt-24 rounded-xl shadow-lg mx-auto border flex flex-col items-center">
            <h1 className="font-thin text-xl p-2 text-white  w-full rounded-t-xl text-center bg-sky-400 ">Pulse Post</h1>
            <h3 className="p-2">Drop Your Messages Here !!</h3>
            <form className="flex  flex-col justify-start gap-4 p-4 w-full" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col">
                    <input type="file"  onChange={handleFileChange} className='border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400' />
                    <p className='text-xs text-gray-600  pt-2  ' >Total Emails in the file: {emails.length}</p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="subject" className='text-sm font-medium text-gray-600'>Subject :</label>
                    <input type="text" id="subject" onChange={(e) => setSubject(e.target.value)} required value={subject} placeholder="Enter Subject" className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="message" className='text-sm font-medium text-gray-600'>Message :</label>
                    <textarea name="" id="message" onChange={handlemsg} value={msg} placeholder="enter your Messages !!" className="border rounded-lg p-2 mt-1 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 btn" required ></textarea>
                </div>
                <button className="bg-sky-500 text-white rounded-lg py-2 px-4  hover:bg-sky-600 transition-colors" onClick={send} >{status ? "Sending..." : "Send"}</button>
            </form>
        </section >
        <footer>
            <p className="text-center text-sm text-gray-500 mt-4">© 2025 Pulse Post. All rights reserved.</p>
        </footer>
    </>
)
}

export default Home