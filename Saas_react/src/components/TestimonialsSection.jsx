import TagLine from './TagLine'

const TestimonialsSection = () => {
    return (
        <section className="flex items-center justify-center flex-col p-6">
            <TagLine>Testimonials</TagLine>
            <h2 className="text-3xl font-bold text-center mt-3 mb-8">What builders say about us</h2>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 items-center max-w-screen-xl text-left">
                <div className="grid gap-4">
                    <div className="border rounded-lg bg-white/20 backdrop-blur-lg p-6 hover:shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <img src="testimonials/1.png" className="w-12 h-12 rounded-full"
                        alt="User Image"/>
                        <p>Suzuki</p>
                    </div>
                        <p className="text-sm space-y-4">
                            <span>
                                The AI Form Builder has revolutionized the way we
                                collect data. It's incredibly intuitive 
                                and has saved us countless hours of manual work.
                                The dynamic form adjustments are a game-changer.
                            </span>
                        </p>
                    </div>
                    <div className="border rounded-lg bg-white/20 backdrop-blur-lg p-6 hover:shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <img src="testimonials/2.png" className="w-12 h-12 rounded-full"
                        alt="User Image"/>
                        <p>Hanako</p>
                    </div>
                        <p className="text-sm space-y-4">
                            <span>
                            Nexx has been an invaluable asset to my small business.
                            The intuitive interface and robust features have allowed me 
                            to streamline my operations, improve efficiency, and ultimately
                            grow my customer base.
                            </span>
                        </p>
                    </div>
                    <div className="border rounded-lg bg-white/20 backdrop-blur-lg p-6 hover:shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <img src="testimonials/3.png" className="w-12 h-12 rounded-full"
                        alt="User Image"/>
                        <p>Maria</p>
                    </div>
                        <p className="text-sm space-y-4">
                            <span>
                            The collaboration tools on Nexx are top-notch. I've been able to
                            work seamlessly with my team, share files effortlessly, and stay
                            organized on even the most complex projects.
                            </span>
                        </p>
                    </div>

                </div>
                <div className="grid gap-4">
                    <div className="border rounded-lg bg-white/20 backdrop-blur-lg p-6 hover:shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <img src="testimonials/4.png" className="w-12 h-12 rounded-full"
                        alt="User Image"/>
                        <p>Mohammad</p>
                    </div>
                        <p className="text-sm space-y-4">
                            <span>
                            Nexx has transformed the way I manage my workload.
                            The time-saving features and automation capabilities
                            have significantly increased my productivity and allowed
                            me to focus on what truly matters.
                            </span>
                        </p>
                    </div>
                    <div className="border rounded-lg bg-white/20 backdrop-blur-lg p-6 hover:shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <img src="testimonials/5.png" className="w-12 h-12 rounded-full"
                        alt="User Image"/>
                        <p>Letitia</p>
                    </div>
                        <p className="text-sm space-y-4">
                            <span>
                            As a student, Nexx has been an indispensable tool for
                            staying organized and focused. The calendar, note-taking,
                            and task management features have helped me manage my time
                            effectively and achieve my academic goals.
                            </span>
                        </p>
                    </div>
                    <div className="border rounded-lg bg-white/20 backdrop-blur-lg p-6 hover:shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <img src="testimonials/6.png" className="w-12 h-12 rounded-full"
                        alt="User Image"/>
                        <p>WangWei</p>
                    </div>
                        <p className="text-sm space-y-4">
                            <span>
                            Nexx offers exceptional value for the price. The wide 
                            range of features and benefits it provides far outweighs 
                            the cost, making it a worthwhile investment for 
                            businesses and individuals alike.
                            </span>
                        </p>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="border rounded-lg bg-white/20 backdrop-blur-lg p-6 hover:shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <img src="testimonials/7.png" className="w-12 h-12 rounded-full"
                        alt="User Image"/>
                        <p>Valadimir</p>
                    </div>
                        <p className="text-sm space-y-4">
                            <span>
                            Nexx offers exceptional value for the price. The wide range of 
                            features and benefits it provides far outweighs the cost, 
                            making it a worthwhile investment for businesses
                            and individuals alike.
                            </span>
                        </p>
                    </div>
                    <div className="border rounded-lg bg-white/20 backdrop-blur-lg p-6 hover:shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <img src="testimonials/8.png" className="w-12 h-12 rounded-full"
                        alt="User Image"/>
                        <p>Ebrahim</p>
                    </div>
                        <p className="text-sm space-y-4">
                            <span>
                            Nexx has empowered me to achieve my goals and reach
                            new heights in my career. The platform's versatility 
                            and adaptability have made it an invaluable asset.
                            </span>
                        </p>
                    </div>
                    <div className="border rounded-lg bg-white/20 backdrop-blur-lg p-6 hover:shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <img src="testimonials/9.png" className="w-12 h-12 rounded-full"
                        alt="User Image"/>
                        <p>ZhangFeng</p>
                    </div>
                        <p className="text-sm space-y-4">
                            <span>
                            I'm incredibly grateful for Nexx. It has simplified my
                            life in so many ways, from managing my tasks to collaborating
                            with others. I highly recommend it to anyone looking for a
                            powerful and user-friendly productivity tool.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection