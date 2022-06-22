import React from "react"
import { FaGithub } from 'react-icons/fa';
import "../FooterComp/FooterComp.scss"

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Инвентаризация</h5>
                <h6 className="text-lovercase">
                    <ul className="list-unstyled">
                        <li><a href="#">Наверх</a></li>
                    </ul>
                </h6>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-6 mb-md-0 mb-3">
                <h5 className="text-uppercase">Репозиторий</h5>
                <ul className="list-unstyled">
                    <li><a href="https://github.com/Digitable-team/minecraft"><FaGithub size={"35px"} top={"10px"}/></a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2022 COPYRIGHT
        <a> DIGITABLE</a>
    </div>

</footer>

export default Footer