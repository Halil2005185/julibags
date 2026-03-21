function AdminLogin() {
    return (
        <section className="flex items-center justify-center h-[calc(100vh-300px)] ">
            <form className="flex flex-col gap-4 rounded-lg shadow-md w-[500px] bg-[#eee] p-4 ">
                <div className="flex flex-col gap-1 ">
                    <label className="font-medium text-[20px]" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="Please Enter the admin email"
                        className="outline-none rounded-md px-2 py-1 "
                    />
                </div>
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        required
                        className="outline-none rounded-md px-2 py-1 "
                        placeholder=""
                    />
                </div>
                <button className=" ring-1 ring-black/5 rounded-lg bg-green-600 hover:bg-green-800 text-white text-[20px] font-medium py-2 " type="submit">Login</button>
            </form>
        </section>
    );
}
export default AdminLogin;
