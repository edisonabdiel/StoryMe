import React from 'react';
import Select from "react-select";
import {
    Row,
    Col
} from "reactstrap";



export default function DropdownIconsCategory(props) {
    return (
        <div className="select">
            <Row >
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} >

                    <Select
                        className="react-select react-select-info mt-2"
                        onChange={(value) => props.iconValue(value)}
                        classNamePrefix="react-select"
                        placeholder="&#x27a2;"
                        value={props.icon}
                        name=""
                        options={[
                            {
                                value: "",
                                label: "Icon",
                                isDisabled: true,
                            },
                            { value: "2", label: <i className="now-ui-icons users_single-02"></i> },
                            { value: "3", label: <i className="now-ui-icons ui-1_zoom-bold"></i> },
                            { value: "4", label: <i className="now-ui-icons ui-2_favourite-28"></i> },
                            { value: "5", label: <i className="now-ui-icons tech_controller-modern"></i> },
                            { value: "6", label: <i className="now-ui-icons transportation_air-baloon"></i> },
                            { value: "7", label: <i className="now-ui-icons sport_user-run"></i> },
                            { value: "8", label: <i className="now-ui-icons education_glasses"></i> },
                            { value: "9", label: <i className="now-ui-icons objects_planet"></i> },
                            { value: "10", label: <i className="now-ui-icons objects_diamond"></i> },
                            { value: "11", label: <i className="now-ui-icons objects_spaceship"></i> },
                            { value: "12", label: <i className="now-ui-icons media-2_sound-wave"></i> },
                            { value: "13", label: <i className="now-ui-icons files_paper"></i> },
                            { value: "14", label: <i className="now-ui-icons files_single-copy-04"></i> },
                            { value: "15", label: <i className="now-ui-icons emoticons_satisfied"></i> },
                            { value: "15", label: <i className="now-ui-icons design_app"></i> },
                            { value: "16", label: <i className="now-ui-icons design_palette"></i> },
                            { value: "17", label: <i className="now-ui-icons business_money-coins"></i> },
                            { value: "18", label: <i className="now-ui-icons business_bulb-63"></i> },
                        ]}
                    ></Select>
                </Col>
            </Row>

        </div>
    )
}




