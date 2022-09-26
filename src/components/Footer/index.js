import React from 'react'
import './Footer.css'


function Footer() {
  return (
    <div className='main-footer'>
        <div className='footer-container'>
            <div className='row'>
                <div className='col'>
                    <ul className='list-unstyled'>
                        <li><a href="https://twitter.com/galledann"><i class="fab fa-twitter fa"></i></a></li>
                        <li><a href="https://www.instagram.com/onrclklrr"><i class="fab fa-instagram fa"></i></a></li>
                        <li><a href="https://www.linkedin.com/in/onur-çelikler-429b02187/" ><i class="fab fa-linkedin fa"></i></a></li>
                        <li><a href="/admin">Admin</a></li>
                    
                    </ul>
                </div>
                <div className='col'>
                    <ul className='list-unstyled'>
                        <li><a href="mailto:onrclklr@outlook.com"><i class="fas fa-envelope"></i> onrclklr@outlook.com</a></li>
                        <li><a href="https://api.whatsapp.com/send/?phone=905053339031&text&type=phone_number&app_absent=0"><i class="fas fa-phone"></i> +90 505 333 90 31</a></li>   
                    </ul>
             
                
                </div>
            </div>
            <hr />
            <div className='row'>
                <p className='col-sm'>
                    &copy;({new Date().getFullYear()}) Steels Foundation |  All rights reserved | Terms of Service | Privacy
                </p>
                
            </div>
        </div>
    </div>
  )
}
export default Footer