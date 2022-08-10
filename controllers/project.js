
const Project = require('../models/project');
var project = require('../models/project')
var fs = require("fs")
var path = require('path')

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Pagina'
        })
    },

    test: function (req, res) {
        return res.status(200).send({
            message: 'Pagina de test'
        })
    },

    saveProject: function (req, res) {
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = "null";

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'Error al desar el document: '+ err });

            if (!projectStored) return res.status(404).send({ message: 'Document no desat' });

            return res.status(200).send({ project: projectStored });
        });
    },

    getProject: function (req, res) {
        var projectId = req.params.id;
        console.log(projectId)

        if (projectId == null) return res.status(500).send({ message: 'No has especificat cap projecte' })

        else {

            project.findById(projectId, (err, project) => {

                if (err) {
                    console.log(err)
                    return res.status(500).send({ message: 'Error al retornar les dades' })
                }

                if (!project) return res.status(500).send({ message: 'El projecte no existeix ' })

                return res.status(200).send({
                    project
                })
            })
        }
    },

    getProjects: function (req, res) {

        project.find((err, projects) => {
            return res.status(200).send({
                projects
            })
        })

    },

    updateProject: function (req, res) {
        
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) {
                return res.status(500).send({ message: 'Error actualitzant les dades' })

            }
            if (!projectUpdated) return res.status(404).send({ message: 'No existeix el projecte' })
            return res.status(200).send({
                project: projectUpdated
            })
        })


    },

    deleteProject: function (req, res) {

        console.log("entra id:"+req)

        var projectId = req.params.id;
        Project.findByIdAndDelete(projectId, (err, projectRemoved) => {

            if (err) {
                return res.status(500).send({ message: 'Error: No s\'ha pogut borrar el projecte. ' })
            }
            if (!projectRemoved) return res.status(404).send({ message: 'No existeix el projecte a borrar' })
            return res.status(200).send({
                project: projectRemoved
            })

        })
    },

    uploadImage: function (req, res) {
        var projectId = req.params.id
        var fileName = "Imatge no pujada";
        var EXTENSIONS = ["png", "jpg", "jpeg", "giff"]

        if (req.files) {

            var filePath = req.files.image.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            var fileFilter = fileName.split(".")[1]

            if (EXTENSIONS.includes(fileFilter)) {
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                    if (err) {
                        return res.status.send({ message: 'Error actualitzant la imatge' });
                    }
                    if (!projectUpdated) return res.status(404).send({ message: 'No existeix el projecte' })
                    return res.status(200).send({
                        project: projectUpdated
                    })
                })
            }
            else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: `L\'extensió no es correcta.` })
                })
            }

        } else {
            return res.status(200).send({
                missatge: fileName
            })
        }
    },

    getImage: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/' + file;
        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file))
            } else {
                return res.sendFile(path.resolve('./uploads/no-image.png'))
            }
        })
        
    }
};



module.exports = controller;