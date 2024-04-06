export const Subscription = () => {
    return (
        <>

            <div className="flex flex-wrap justify-center mt-10">
                <div className="card w-96 bg-base-100 shadow-xl mx-4">
                    <figure><img
                        src="https://static.vecteezy.com/system/resources/previews/001/842/936/original/dark-blue-background-in-polygonal-style-vector.jpg"
                        className="h-48 w-96" alt="Free"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Basic
                        </h2>

                        <ol className="text-center">
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                        </ol>
                        <p className="text-2xl text-center mb-4 mt-4"><b>Free</b></p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Testing</div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="btn btn-primary mt-3 bg-stone-400 text-slate-100 border-transparent  "
                                disabled>Already bought
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl mx-4">
                    <figure><img
                        src="https://static.vecteezy.com/system/resources/thumbnails/016/070/541/small/silver-texture-aluminum-web-background-template-vector.jpg"
                        className="h-48 w-96" alt="Silver"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Silver
                        </h2>

                        <ol className="text-center">
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                        </ol>
                        <p className="text-2xl text-center mb-4 mt-4"><b>10$/month</b></p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Cheapest</div>
                            <div className="badge badge-outline">Apartment</div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="btn btn-primary mt-3 bg-stone-400 text-slate-100 border-transparent ">Upgrade
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl mx-4">
                    <figure><img
                        src="https://static.vecteezy.com/system/resources/previews/002/945/744/non_2x/of-gold-gradient-gold-gradient-background-texture-metallic-free-vector.jpg"
                        className="h-48 w-96" alt="Gold"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Gold
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <ol className="text-center">
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                        </ol>
                        <p className="text-2xl text-center mb-4 mt-4"><b>25$/month</b></p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Office</div>
                            <div className="badge badge-outline">Home</div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="btn btn-primary mt-3 text-slate-100 bg-amber-400 border-transparent">Upgrade
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl mx-4">
                    <figure><img
                        src="https://static.vecteezy.com/system/resources/previews/009/360/288/non_2x/texture-web-background-stylish-carbon-fiber-vector.jpg"
                        className="h-48 w-96" alt="Premium"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Premium
                            <div className="badge badge-accent">Most valuable</div>
                        </h2>
                        <ol className="text-center">
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                        </ol>
                        <p className="text-2xl text-center mb-4 mt-4"><b>50$/month</b></p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Office</div>
                            <div className="badge badge-outline">Multiple locations</div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="btn btn-primary mt-3 bg-stone-900 text-slate-100 border-transparent">Upgrade
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}