import { FormLogin } from "@/src/components/forms/formSign"
import { Col, Container, Row } from "react-bootstrap"
import variables from '@/src/styles/variable.module.scss'
import Image from "next/image"

export const Hero = ({ Title }) => {
    return (
        <>
            <main style={{ background: variables.primaryColor }}>
                <section className="d-flex justify-content-center align-items-center vh-100 w-100">
                    <Container className="shadow-white radius-30 overflow-hidden w-sx-80-md-50">
                        <Row>
                            <Col md={6}>
                                <article className="w-100 h-100 p-4 d-flex flex-column justify-content-center align-items-center" style={{ background: variables.primaryColor }}>
                                    <Image
                                        src={'https://boo.world/static/boo_logo.svg'}
                                        width={200}
                                        height={200}
                                        className="motion-boo"
                                        alt="Boo.world"
                                    />
                                    <h1 style={{ color: variables.mainColor }}>{Title ? Title : 'Title'}</h1>
                                    <p style={{ color: variables.secondColor }}>Login: boo@boo.world.com</p>
                                    <p style={{ color: variables.secondColor }}>Password: Boo@123</p>
                                    <p style={{ color: variables.secondColor }}>Or feel free to register.</p>

                                </article>
                            </Col>
                            <Col md={6} className="d-flex flex-column justify-content-center align-items-center p-20 p-4">
                                <FormLogin />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
        </>
    )
}