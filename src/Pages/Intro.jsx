import React from 'react'
import { Link } from 'react-router-dom'

function Intro() {
    return (
        <div>
            <div>
                <h1 className='bg-primary text-light p-2'>BlogSphere</h1>
                <div className='row mt-5 mb-3 mx-auto text-center'>
                    <h2>Welcome to BlogSphere - Your Gateway to Infinite Expression!</h2>
                    <h3>Unleash Your Creativity with BlogSphere</h3>
                    <div className='my-4'>
                        <Link to={'/login'}>
                            <button className='btn btn-primary'>Get Started</button>
                        </Link>
                    </div>
                    <div className='text-center m-0 p-0'>

                        <img style={{ width: '30%', height: 'auto' }} src="https://png.pngtree.com/png-vector/20220520/ourmid/pngtree-concept-vector-illustration-of-business-blogging-png-image_4635833.png" alt="" />

                    </div>
                    {/* <img src="https://th.bing.com/th/id/OIP.qyiBUFuDi0Da2YW9z1Mb8AHaFL?w=1000&h=700&rs=1&pid=ImgDetMain" style={{ width: '20%', maxWidth: '100%', height: 'auto' }}  alt="" /> */}
                </div>
                <div className="row mx-3">
                    <div className="col-md-6">
                        <div className='mt-5'>
                            <h4 className='pt-5'>Get Started in 3 Easy Steps:</h4>
                            <ul>
                                <li>Sign Up for Free</li>
                                <li>Create Your Blog</li>
                                <li>Share Your Passion</li>
                            </ul>
                            <h3>What Can You Blog About?</h3>
                            <ul>
                                <li>Personal Stories: Share your life experiences, adventures, and insights.</li>
                                <li>Travel Diaries: Document your journeys and share travel tips and guides.</li>
                                <li>Food & Recipes: Share your culinary creations, recipes, and food photography.</li>
                                <li>Tech & Gadgets: Write reviews, tutorials, and the latest tech news.</li>
                                <li>Health & Fitness: Share workout routines, nutrition tips, and wellness advice.</li>
                                <li>Arts & Crafts: Showcase your creative projects, DIY tutorials, and artistic endeavors.</li>
                                <li>Fashion & Beauty: Share fashion tips, beauty routines, and style guides.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <img style={{ width: '100%' }} className='p-3' src="https://dougthorpe.com/wp-content/uploads/2022/08/blog-650x650.png" alt="" />
                    </div>
                </div>
                <div className="row mx-2 text-center">
                    <h2>Join BlogSphere Today!</h2>
                    <p className='px-3'>Don’t wait any longer to start your blogging journey. Join BlogSphere today and become part of a thriving community where your voice matters. Click the button below to sign up and start blogging for free!</p>
                    <div className='mb-4'>
                        <Link to={'/register'}>
                            <button className='btn btn-primary'>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro