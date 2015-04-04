describe('vastengine.Controller', function () {
    var testController;

    beforeEach(function () {
        testController = new vastengine.Controller();
        testController.postStep = function () { };
        testController.onTouch  = function () { };
    });

    it('Has a defined entities and view properties upon instantiation.', function () {
        expect(testController.entities).toBeDefined();
        expect(testController.view).toBeDefined();
    });

    it('Can set the view (x,y) position', function () {
        expect(testController.view.x).toEqual(0);
        expect(testController.view.y).toEqual(0);
        
        testController.setViewPosition(8, 25);

        expect(testController.view.x).toEqual(8);
        expect(testController.view.y).toEqual(25);
    });

    it('Calls its own pre- and post-step methods at the beginning/end of each step.', function () {
        spyOn(testController, 'preStep');
        spyOn(testController, 'postStep');
        testController.step();
        expect(testController.preStep).toHaveBeenCalled();
        expect(testController.postStep).toHaveBeenCalled();
    });

    it('Calls each managed Entity object\'s step method', function () {
        var ent1 = new vastengine.Entity(null, 'ent1');
        var ent2 = new vastengine.Entity(null, 'ent2');
        testController.entities = [ent1, ent2];

        spyOn(ent1, 'step');
        spyOn(ent2, 'step');

        testController.step();

        expect(ent1.step).toHaveBeenCalled();
        expect(ent2.step).toHaveBeenCalled();
    });

    it('Removes destroyed Entity objects at the beginning of each step.', function () {
        var ent1 = new vastengine.Entity(null, 'ent1');
        var ent2 = new vastengine.Entity(null, 'ent2');
        var ent3 = new vastengine.Entity(null, 'ent3');
        testController.entities = [ent1, ent2, ent3];

        // destroy two
        ent1.destroy();
        ent2.destroy();

        spyOn(ent1, 'step');
        spyOn(ent2, 'step');
        spyOn(ent3, 'step');

        // step() will remove destroyed Entity objects before calling their step()
        testController.step();

        expect(ent1.step).not.toHaveBeenCalled();
        expect(ent2.step).not.toHaveBeenCalled();
        expect(ent3.step).toHaveBeenCalled();
        expect(testController.entities.length).toEqual(1);
    });

    it('Can add an Entity object to its managed collection', function () {
        expect(testController.entities.length).toEqual(0);
        testController.addEntity(new vastengine.Entity());
        expect(testController.entities.length).toEqual(1);
    });

    it('Can return its managed Entity collection', function () {
        expect(testController.getEntities().length).toEqual(0);
    });

    it('Can retrieve a managed Entity object by its ID value.', function () {
        testController.addEntity(new vastengine.Entity(null, 'entId1'));
        var entity2 = testController.getEntityById('entId1');
        expect(entity2).toBeDefined();
    });

    it('Retrieves all managed Entity objects with a particular type.', function () {
        testController.addEntity(new vastengine.Entity('blue', 100));
        testController.addEntity(new vastengine.Entity('blue', 101));
        testController.addEntity(new vastengine.Entity('red', 102));
        testController.addEntity(new vastengine.Entity('green', 103));

        var redOnes = testController.getEntitiesByType('red');
        var blueOnes = testController.getEntitiesByType('blue');
        var orangeOnes = testController.getEntitiesByType('orange');

        expect(redOnes.length).toEqual(1);
        expect(blueOnes.length).toEqual(2);
        expect(orangeOnes.length).toEqual(0);
        expect(blueOnes[0].type).toEqual(blueOnes[1].type);
    });

    it('Finds a collection of all Entity objects at a given (x, y) position.', function () {
        var ent1 = new vastengine.Entity(null, 'ent1');
        ent1.setSize(50, 50);
        ent1.setPosition(50, 50);
        testController.addEntity(ent1);

        var ent2 = new vastengine.Entity(null, 'ent2');
        ent2.setSize(50, 50);
        ent2.setPosition(75, 75);
        testController.addEntity(ent2);

        var entsAtPos1 = testController.getEntitiesAtPosition(60, 60);
        expect(entsAtPos1.length).toEqual(1);

        var entsAtPos2 = testController.getEntitiesAtPosition(90, 90);
        expect(entsAtPos2.length).toEqual(2);

        var entsAtPos3 = testController.getEntitiesAtPosition(30, 30);
        expect(entsAtPos3.length).toEqual(0);
    });

    it('Finds a collection of Entity objects with a given type and (x, y) position.', function () {
        var ent1 = new vastengine.Entity('ent', 'ent1');
        ent1.setSize(50, 50);
        ent1.setPosition(50, 50);
        testController.addEntity(ent1);

        var ent2 = new vastengine.Entity('ent', 'ent2');
        ent2.setSize(50, 50);
        ent2.setPosition(75, 75);
        testController.addEntity(ent2);

        var ent3 = new vastengine.Entity('bit', 'bit1');
        ent3.setSize(50, 50);
        ent3.setPosition(110, 110);
        testController.addEntity(ent3);

        var entsAtPos1 = testController.getEntitiesAtPosition(80, 80, 'ent');
        expect(entsAtPos1.length).toEqual(2);

        var entsAtPos2 = testController.getEntitiesAtPosition(90, 90, 'bit');
        expect(entsAtPos2.length).toEqual(0);
    });

    it('Can determine whether a given position is free of any Entity objects.', function () {
        var ent1 = new vastengine.Entity('ent', 'ent1');
        ent1.setSize(50, 50);
        ent1.setPosition(50, 50);
        testController.addEntity(ent1);

        expect(testController.isPositionFree(60, 70)).toBeFalsy();
    });

    it ('Can determine whether a given position is free of Entity objects of a given type.', function () {
        var ent1 = new vastengine.Entity('orange', 0x1);
        ent1.setSize(50, 50);
        ent1.setPosition(100, 100);
        testController.addEntity(ent1);

        var ent2 = new vastengine.Entity('notorange', 0x2);
        ent2.setSize(50, 50);
        ent2.setPosition(100, 150);
        testController.addEntity(ent2);

        expect(testController.isPositionFree(120, 120)).toBeFalsy();
        expect(testController.isPositionFree(120, 170, 'orange')).toBeTruthy();
    });

    it('Sorts the managed collection of Entity objects in descending order by depth (largest = deepest first).', function () {
        var ent1 = new vastengine.Entity(null, 'e1');
        ent1.depth = 50;
        testController.addEntity(ent1);

        var ent2 = new vastengine.Entity(null, 'e2');
        ent2.depth = 100;
        testController.addEntity(ent2);

        var ent3 = new vastengine.Entity(null, 'e3');
        ent3.depth = -10;
        testController.addEntity(ent3);

        var ent4 = new vastengine.Entity(null, 'e4');
        ent4.depth = 20;
        testController.addEntity(ent4);

        testController.sortEntities();

        expect(testController.entities[0].id).toEqual("e2");
        expect(testController.entities[1].id).toEqual("e1");
        expect(testController.entities[2].id).toEqual("e4");
        expect(testController.entities[3].id).toEqual("e3");
    });
});